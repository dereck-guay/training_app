type Split = {
    id: number;
    user_id: number;

    name: string;

    created_at: string;
    updated_at: string

    workouts: Workout[] | null;
    exercises: Exercise[]
}