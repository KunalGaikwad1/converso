import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="justify-center items-center min-lg:w-1/3 min-md:w-2/3 ">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src={"/images/limit.svg"}
            alt="companion limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade Your Plan</div>
          <h1>You have Reached Your Limit</h1>
          <p>
            You reached your companion limit, Upgrade to create more Companions
            and access premium features.
          </p>
          <Link
            href={"/subscription"}
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
