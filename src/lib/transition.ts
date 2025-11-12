import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function transition(
  router: AppRouterInstance,
  href: string,
  id: string
) {
  const element = document.querySelector(`#${id}`);

  if (element) {
    element.classList.add("fade-out");
    setTimeout(() => {
      router.push(href);
    }, 300);
  } else {
    router.push(href);
  }
}
