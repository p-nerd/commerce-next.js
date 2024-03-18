<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class OverviewController extends Controller
{
    public function index()
    {
        return inertia('admin/Overview');
    }
}
