type Serie = {
    id: number;
    workout_id: number | null;
    day_id: number | null;
    exercise_id: number;

    order: number;

    created_at: string;
    updated_at: string;
}