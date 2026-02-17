import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { ProfileSidebar } from "@/features/profile/components/profile-sidebar";
import { AccountSettings } from "@/features/profile/components/account-settings";

export default function WorkshopPage() {
    return (
        <>
            <Header />
            <main className="flex lg:flex-row flex-col gap-16 mx-auto px-6 py-12 lg:py-20 max-w-[1440px]">
                <ProfileSidebar />
                <AccountSettings />
            </main>
            <Footer />
        </>
    );
}
