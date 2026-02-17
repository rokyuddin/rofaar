import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { ProfileSidebar } from "@/features/profile/components/profile-sidebar";
import { ProfileArchive } from "@/features/profile/components/profile-archive";

export default function ProfilePage() {
    return (
        <>
            <Header />
            <main className="flex lg:flex-row flex-col gap-16 mx-auto px-6 py-12 lg:py-20 max-w-[1440px]">
                <ProfileSidebar />
                <ProfileArchive />
            </main>
            <Footer />
        </>
    );
}
