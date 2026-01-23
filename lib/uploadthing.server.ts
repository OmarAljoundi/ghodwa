'use server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!,
);

export const deleteSupabaseFiles = async (paths: string[]) => {
  try {
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
      .remove(paths);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Supabase: Error deleting files', error);
  }
};

export const uploadSupabaseFiles = async (files: File[]) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const uniquePath = `${crypto.randomUUID()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
        .upload(uniquePath, file);

      if (error) return { error };

      const {
        data: { publicUrl },
      } = supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!).getPublicUrl(data.path);

      return { data: { ...data, url: publicUrl } };
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Supabase: Error uploading files', error);
    return [];
  }
};
