import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DiagnosisResult, Patient } from "../backend";
import { useActor } from "./useActor";

export function useGetAllPatients() {
  const { actor, isFetching } = useActor();
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPatients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateAndAnalyzePatient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patient: Patient): Promise<DiagnosisResult> => {
      if (!actor) throw new Error("Actor not ready");
      const [, result] = await Promise.all([
        actor.addPatient(patient),
        actor.analyzePatient(patient),
      ]);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}
