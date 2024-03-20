const time = {
    format: {
        day_month_year: (date: string | Date) =>
            new Date(date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
    },
};

export default time;
