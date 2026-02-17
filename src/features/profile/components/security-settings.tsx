import { ShieldCheck, Lock, Smartphone, Key } from "lucide-react";

export function SecuritySettings() {
    return (
        <div className="flex-1 space-y-12">
            <div className="flex flex-col gap-2">
                <h1 className="font-display font-bold text-3xl">Security & Sanctuary</h1>
                <p className="text-muted-foreground text-sm">Fortify your digital presence and protect your journey.</p>
            </div>

            <div className="space-y-8 max-w-2xl">
                {/* Password */}
                <div className="space-y-6 bg-white p-8 border border-border rounded-sm">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="flex justify-center items-center bg-primary/10 rounded-full size-10">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-display font-bold text-lg">Access Credentials</h2>
                            <p className="text-muted-foreground text-xs uppercase tracking-wider">Update your sanctuary password</p>
                        </div>
                    </div>

                    <div className="gap-4 grid grid-cols-1">
                        <input
                            type="password"
                            className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                            placeholder="Current Password"
                        />
                        <input
                            type="password"
                            className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                            placeholder="New Fortified Password"
                        />
                        <button className="hover:bg-primary mt-2 px-6 py-2.5 rounded-sm w-fit font-bold bg-text-main text-white uppercase tracking-widest transition-all">
                            Update Password
                        </button>
                    </div>
                </div>

                {/* 2FA */}
                <div className="space-y-6 bg-white p-8 border border-border rounded-sm">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4 text-primary">
                            <div className="flex justify-center items-center bg-primary/10 rounded-full size-10">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-lg">Dual Authentication</h2>
                                <p className="text-muted-foreground text-xs uppercase tracking-wider">Additional layer of protection</p>
                            </div>
                        </div>
                        <span className="bg-green-100 px-2 py-1 rounded-sm font-bold text-[10px] text-green-700 uppercase tracking-wide">
                            Active
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Your account is protected by an extra layer of security. Every login requires a code from your trusted device.
                    </p>
                    <button className="font-bold text-accent text-xs decoration-1 hover:underline underline-offset-4 uppercase tracking-widest">
                        Deactivate Multi-Factor
                    </button>
                </div>

                {/* Login Sessions */}
                <div className="space-y-6 bg-white p-8 border border-border rounded-sm">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="flex justify-center items-center bg-primary/10 rounded-full size-10">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h2 className="font-display font-bold text-lg">Active Sessions</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-border/30 border-b">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <span className="block font-bold text-sm leading-none">iPhone 14 Pro</span>
                                    <span className="block mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">Casablanca, Morocco • Current Session</span>
                                </div>
                            </div>
                            <span className="font-bold text-[10px] text-green-600 uppercase tracking-wider">Online</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <div className="flex items-center gap-3">
                                <Key className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <span className="block font-bold text-sm leading-none">MacBook Pro 16&quot;</span>
                                    <span className="block mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">Rabat, Morocco • 2 days ago</span>
                                </div>
                            </div>
                            <button className="font-bold text-[10px] text-accent decoration-1 hover:underline underline-offset-4 uppercase tracking-widest">End</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
