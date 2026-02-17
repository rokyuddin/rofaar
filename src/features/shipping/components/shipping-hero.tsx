import React from "react";

export const ShippingHero: React.FC = () => {
    return (
        <section className="mb-20 max-w-3xl">
            <h1 className="mb-6 font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-tight">
                From Our Hands <br />
                <span className="text-primary italic">To Yours</span>
            </h1>
            <p className="font-display text-muted-foreground text-lg leading-relaxed">
                We believe that the journey of a handcrafted piece is as important as its destination.
                Every item in our collection is prepared with the utmost care, ensuring it reaches you
                in pristine condition, wherever you are in the world.
            </p>
        </section>
    );
};
