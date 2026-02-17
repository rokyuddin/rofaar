import Image from 'next/image'
import LogoImg from '../../../public/logo.svg'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Image
                src={LogoImg}
                alt="Logo"
                height={30}
                width={40}
            />
            <span className="hidden lg:block font-display font-bold text-primary text-4xl tracking-tight transition-colors">
                ROFAAR
            </span>
        </div>
    )
}
