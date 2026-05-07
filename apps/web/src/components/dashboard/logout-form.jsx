import { logoutAction } from "@/app/dashboard/actions";

export function LogoutForm() {
  return (
    <form action={logoutAction}>
      <button className="button secondary logout-button" type="submit">
        تسجيل الخروج
      </button>
    </form>
  );
}
