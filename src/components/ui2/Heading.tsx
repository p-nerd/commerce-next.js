const Heading = (p: { title: string; description: string }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{p.title}</h2>
            <p className="text-sm text-muted-foreground">{p.description}</p>
        </div>
    );
};

export default Heading;
