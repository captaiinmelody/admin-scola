<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class ProductController extends Controller
{
    public function index()
    {
        $products = DB::table('products')->get();
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('Products/partials/ProductCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required',
            'tagline' => 'nullable',
            'concept' => 'nullable',
            'overall_concept' => 'required',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Generate UUID for the id field
        $productId = Uuid::uuid4()->toString();

        // Retrieve other form data
        $productData = [
            'id' => $productId,
            'product_name' => $request->input('product_name'),
            'tagline' => $request->input('tagline'),
            'concept' => $request->input('concept'),
            'overall_concept' => $request->input('overall_concept'),
            'created_at' => now(),
            'updated_at' => now(),
        ];

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $filePath = 'assets/images/' . $fileName;
            $file->move(public_path('assets/images'), $fileName);
            $productData['logo_url'] = $filePath;
        }

        DB::table('products')->insert($productData);

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }


    public function show($id)
    {
        $product = DB::table('products')->find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Product not found');
        }
        return inertia('Products/Show', ['product' => $product]);
    }


    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', ['product' => $product]);
    }

    public function update(Request $request, $id)
    {
        $product = DB::table('products')->find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        $request->validate([
            'product_name' => 'required',
            'tagline' => 'nullable',
            'concept' => 'nullable',
            'overall_concept' => 'required',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust file validation as needed
        ]);

        // Generate UUID for the id field
        $productId = Uuid::uuid4()->toString();

        $productData = [
            'id' => $productId,
            'product_name' => $request->input('product_name'),
            'tagline' => $request->input('tagline'),
            'concept' => $request->input('concept'),
            'overall_concept' => $request->input('overall_concept'),
            'updated_at' => now(),
        ];

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $filePath = 'assets/images/' . $fileName;
            $file->move(public_path('assets/images'), $fileName);
            $productData['logo_url'] = $filePath;
        }

        DB::table('products')->where('id', $id)->update($productData);

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }


    public function destroy($id)
    {
        $product = DB::table('products')->find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Product not found');
        }

        DB::table('products')->where('id', $id)->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}