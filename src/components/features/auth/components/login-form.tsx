"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.email({ message: "请输入正确的邮箱格式" }),
  password: z.string().min(6, { message: "密码长度不能小于6位" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInGithub = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: () => {
          toast.error("Something went wrong with Github login");
        },
      }
    );
  };

  const signInGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: () => {
          toast.error("Something went wrong with Google login");
        },
      }
    );
  };

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>欢迎回来</CardTitle>
          <CardDescription>请输入您的邮箱和密码登录</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={signInGithub}
                    variant="outline"
                    className={cn(
                      "w-full",
                      isPending ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    disabled={isPending}
                  >
                    <Image
                      src="/logos/github.svg"
                      alt="Github Logo"
                      width={20}
                      height={20}
                    />
                    Continue with Github
                  </Button>
                  <Button
                    onClick={signInGoogle}
                    variant="outline"
                    className={cn(
                      "w-full",
                      isPending ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    disabled={isPending}
                  >
                    <Image
                      src="/logos/google.svg"
                      alt="Google Logo"
                      width={20}
                      height={20}
                    />
                    Continue with Google
                  </Button>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="请输入邮箱"
                            {...field}
                          />
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
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    登录
                  </Button>
                </div>
                <div className="text-center text-sm">
                  还没有账号？{" "}
                  <Link
                    href="/signup"
                    className="text-primary underline underline-offset-4"
                  >
                    注册
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
