/*动态路由命名
[[]]	表示这是一个动态路由片段
...	表示这是一个“catch-all”路由，可以匹配任意数量的嵌套路径，比如/auth/login/*
index	是参数名，你可以在页面组件中通过 router.query.index 获取路径值
*/
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/signup "/>
    </div>
  );
}
