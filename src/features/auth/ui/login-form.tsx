import { Button } from '@/shared/ui/kit/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../model/use-login';

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email обязателен',
    })
    .email({ message: 'Некорректный email' }),
  password: z
    .string({
      required_error: 'Пароль обязателен',
    })
    .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login, isPending, errorMessage } = useLogin();

  const onSubmit = form.handleSubmit((data) => {
    login(data);
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}
        <Button type="submit" disabled={isPending}>
          Войти
        </Button>
      </form>
    </Form>
  );
}
