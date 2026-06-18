import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ComingSoon({ title, stage, description }: { title: string; stage: string; description: string }) {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Coming in {stage}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          The data model and access controls are already provisioned. UI lands in the next build stage.
        </CardContent>
      </Card>
    </div>
  );
}