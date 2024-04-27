<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Product;
use App\Models\AdminUser;

class ProductPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(AdminUser $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(AdminUser $user, Product $product): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(AdminUser $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(AdminUser $user, Product $product): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(AdminUser $user, Product $product): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(AdminUser $user, Product $product): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(AdminUser $user, Product $product): bool
    {
        //
    }
}
