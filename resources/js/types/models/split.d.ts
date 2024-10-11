type Split = {
    id: number;
    user_id: number;

    name: string;
    description: string | null;

    created_at: string;
    updated_at: string

    workouts: Workout[] | null;
    exercises: Exercise[]
}