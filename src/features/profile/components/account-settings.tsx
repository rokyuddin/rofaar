"use client";

export function AccountSettings() {
    return (
        <div className="flex-1 space-y-12">
            <div className="flex flex-col gap-2">
                <h1 className="font-display font-bold text-3xl">
                    The Workshop
                </h1>
                <p className="text-muted-foreground text-sm">
                    Refine your profile and adjust the tools of your experience.
                </p>
            </div>

            <div className="space-y-10 max-w-2xl">
                {/* Personal Details */}
                <section className="space-y-6">
                    <h2 className="pb-2 border-border/50 border-b font-display font-bold text-xl">
                        Details of Identity
                    </h2>
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                htmlFor="full-name"
                                className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest"
                            >
                                Full Name
                            </label>
                            <input
                                id="full-name"
                                className="bg-surface p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                                defaultValue="Ahmad Al-Mansour"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="display-name"
                                className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest"
                            >
                                Public Display Name
                            </label>
                            <input
                                id="display-name"
                                className="bg-surface p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                                defaultValue="Ahmad_Reflects"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="biography"
                            className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest"
                        >
                            Biography of Intent
                        </label>
                        <textarea
                            id="biography"
                            rows={4}
                            className="bg-surface p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors resize-none"
                            placeholder="A seeker of barakah and traditional design..."
                        />
                    </div>
                </section>

                {/* Communication */}
                <section className="space-y-6">
                    <h2 className="pb-2 border-border/50 border-b font-display font-bold text-xl">
                        Channels of Connection
                    </h2>
                    <div className="space-y-4">
                        <div className="group flex justify-between items-center bg-surface p-4 border border-border/30 rounded-sm cursor-pointer">
                            <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-sm">
                                    Weekly Journal Digest
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    Reflections and artisan stories delivered to your inbox.
                                </span>
                            </div>
                            <button
                                type="button"
                                className="inline-flex relative bg-primary border-2 border-transparent rounded-full focus:outline-none w-11 h-6 transition-colors duration-200 ease-in-out cursor-pointer shrink-0"
                                aria-pressed="true"
                            >
                                <span className="inline-block bg-white shadow rounded-full ring-0 w-5 h-5 transition translate-x-5 duration-200 ease-in-out pointer-events-none transform" />
                            </button>
                        </div>

                        <div className="group flex justify-between items-center bg-surface p-4 border border-border/30 rounded-sm cursor-pointer">
                            <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-sm">
                                    Acquisition Updates
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    SMS notifications for order status and delivery milestones.
                                </span>
                            </div>
                            <button
                                type="button"
                                className="inline-flex relative bg-border-subtle border-2 border-transparent rounded-full focus:outline-none w-11 h-6 transition-colors duration-200 ease-in-out cursor-pointer shrink-0"
                                aria-pressed="false"
                            >
                                <span className="inline-block bg-white shadow rounded-full ring-0 w-5 h-5 transition translate-x-0 duration-200 ease-in-out pointer-events-none transform" />
                            </button>
                        </div>
                    </div>
                </section>

                <div className="flex gap-4 pt-6 border-border border-t">
                    <button
                        type="submit"
                        className="bg-primary hover:bg-accent shadow-lg shadow-primary/20 px-8 py-4 rounded-sm font-bold text-white uppercase tracking-widest transition-all"
                    >
                        Preserve Changes
                    </button>
                    <button
                        type="button"
                        className="hover:bg-surface px-8 border border-border rounded-sm font-bold text-muted-foreground uppercase tracking-widest transition-all"
                    >
                        Revert
                    </button>
                </div>
            </div>
        </div>
    );
}
