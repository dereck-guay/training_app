type Workout = {
    id: number;
    user_id: number;
    split_id: number

    datetime: string;
    calories: number | null;
    time: number | null;

    created_at: string;
    updated_at: string;

    split: Split | null;
};