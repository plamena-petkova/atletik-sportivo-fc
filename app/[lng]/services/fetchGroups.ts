import { supabase } from "@/lib/supabaseClient";
import { TrainingGroup } from "../hooks/useTrainings";

export const fetchGroups = async (): Promise<TrainingGroup[] | null> => {
  const { data, error } = await supabase
    .from<'trainings', TrainingGroup>('trainings')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching groups:', error.message);
    return null;
  }

  return data ?? null;
};
