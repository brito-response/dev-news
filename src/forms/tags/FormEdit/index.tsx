"use client";

  import { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import { FormProvider, useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useRouter } from "next/navigation";
  import { InputCustom, InputRichTextEditor } from "@/components/Shared/Inputs";
  import { Tag } from "@/utils/models/tags";
  import { formSchema, FormSchemaType } from "./formredef-scheme";

  type FormEditTagProps = { tag: Tag; };

  export const FormEditTag: React.FC<FormEditTagProps> = ({ tag }) => {
    const router = useRouter();
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(Tag.image ?? null);
    const methods = useForm<any>({
      resolver: yupResolver(formSchema), mode: "onChange",
      defaultValues: { title: tag.title, content: tag.content, status: tag.status, image: tag.image },
    });

    const { handleSubmit, watch, formState: { isValid, isSubmitting, dirtyFields } } = methods;
    const titlePreview = watch("title");

    const onSubmit = async (data: FormSchemaType) => {
      const payload = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined && dirtyFields[key as keyof FormSchemaType]));
      if (Object.keys(payload).length === 0 && !photoFile) {
        toast.info("Nenhuma alteração para salvar");
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/Tags/${Tag.TagId}`, {
          method: "Tag",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          toast.error("Erro ao atualizar o tag");
          return;
        }

        if (photoFile) {
          const formData = new FormData();
          formData.append("photo", photoFile);
          const uploadResp = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/images/Tags/${Tag.TagId}`, { method: "Tag", body: formData });
          if (!uploadResp.ok) {
            toast.warning("Tag salvo, mas a imagem não foi atualizada");
          }
        }
        toast.success("Tag atualizado com sucesso!");
        router.refresh();
      } catch {
        toast.error("Erro ao comunicar com o servidor");
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setPhotoFile(file);
      if (file) {
        setPhotoPreview(URL.createObjectURL(file));
      }
    };

    useEffect(() => {
      return () => {
        if (photoPreview?.startsWith("blob:")) {
          URL.revokeObjectURL(photoPreview);
        }
      };
    }, [photoPreview]);

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-6">
          <h1 className="text-3xl font-bold">
            {titlePreview || "Prévia do título do Tag"}
          </h1>
          <InputCustom name="title" label="Título do Tag" />
          {photoPreview && (<img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${photoPreview}`} className="h-64 w-full object-cover rounded-lg" alt="Prévia" />)}

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <InputRichTextEditor name="content" label="Conteúdo" placeholder="Atualize o conteúdo do Tag..." />

          <button type="submit" disabled={!isValid || isSubmitting} className="bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"> Salvar
          </button>
        </form>
      </FormProvider>
    );
  };
