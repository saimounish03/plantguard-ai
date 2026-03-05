import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ScanRecord } from "../backend.d";
import { useActor } from "./useActor";

export function useGetScanHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<ScanRecord[]>({
    queryKey: ["scanHistory"],
    queryFn: async () => {
      if (!actor) return [];
      const records = await actor.getScanHistory();
      return [...records].sort((a, b) => {
        const aTime = typeof a.timestamp === "bigint" ? Number(a.timestamp) : 0;
        const bTime = typeof b.timestamp === "bigint" ? Number(b.timestamp) : 0;
        return bTime - aTime;
      });
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveScan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      diseaseName,
      confidenceScore,
      cropType,
      imageNote,
    }: {
      diseaseName: string;
      confidenceScore: number;
      cropType: string;
      imageNote: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveScan(
        diseaseName,
        BigInt(confidenceScore),
        cropType || null,
        imageNote || null,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanHistory"] });
    },
  });
}

export function useClearHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.clearHistory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanHistory"] });
    },
  });
}
