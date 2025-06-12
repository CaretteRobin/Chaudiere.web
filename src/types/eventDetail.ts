export type EventDetail = {
    id: string;
    title: string;
    description: string;
    price: string;
    start_date: string;
    end_date: string;
    time: string | null;
    category_id: string;
    created_by: string;
    created_at: string;
    category: {
        id: string;
        name: string;
        description?: string;
    }
    author: {
        id: string;
        name: string;
        email: string;
        created_at: string;
    }
    images: {
        id: string;
        url: string;
        event_id: string;
    };
}