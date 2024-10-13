import { router } from '@inertiajs/react';

/**
 * Deletes records from a specified entity.
 *
 * @param entity Model name of the records to delete.
 * @param ids CSV value of all the ids to delete
 */
export function deleteEntity(entity: string, ids: string | number, successRoute: string, extraData = {}) {
    router.delete(
        route('generic.delete', {
            entity: entity,
        }),
        {
            data: {
                ...extraData,
                ids: ids,
            },
            onSuccess: () => router.visit(successRoute),
        },
    );
}
