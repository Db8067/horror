import { Progress } from "@/components/ui/progress";

interface StoryProgressProps {
  value: number;
}

export function StoryProgress({ value }: StoryProgressProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-4">
      <Progress value={value} className="h-2" />
    </div>
  );
}
