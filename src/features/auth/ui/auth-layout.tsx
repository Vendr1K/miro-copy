import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from '@/shared/ui/kit/card';

export function AuthLayout({
  form,
  title,
  description,
  footer,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="grow flex flex-col items-center justify-center ">
      <Card className="w-96 ">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter className=" flex justify-center">
          <p className="text-sm text-muted-foreground [&_a]:text-primary [&_a]:underline">
            {footer}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
