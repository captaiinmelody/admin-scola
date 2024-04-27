<?php

namespace App\Http\Controllers\CMS;

use App\models\CMS\Header;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;


class HeaderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headers = DB::table('headers')->get();

        $formattedHeaders = [];

        $tempHeaders = [];

        foreach ($headers as $header) {
            if ($header->parent_label) {
                $tempHeaders[$header->parent_label][] = [
                    'id' => $header->id,
                    'label' => $header->label,
                    'route' => $header->route,
                ];
            } else {
                $formattedHeaders[] = [
                    'id' => $header->id,
                    'label' => $header->label,
                    'route' => $header->route,
                    'children' => [],
                ];
            }
        }

        foreach ($formattedHeaders as &$header) {
            if (isset ($tempHeaders[$header['label']])) {
                $header['children'] = $tempHeaders[$header['label']];
            }
        }

        return Inertia::render('CMS/Headers', ['headers' => $formattedHeaders]);
    }

    public function fetch_api()
    {
        try {
            $headers = DB::table('headers')->get();

            $formattedHeaders = [];

            $tempHeaders = [];

            foreach ($headers as $header) {
                if ($header->parent_label) {
                    $tempHeaders[$header->parent_label][] = [
                        'id' => $header->id,
                        'label' => $header->label,
                        'route' => $header->route,
                    ];
                } else {
                    $formattedHeaders[] = [
                        'id' => $header->id,
                        'label' => $header->label,
                        'route' => $header->route,
                        'children' => [],
                    ];
                }
            }

            foreach ($formattedHeaders as &$header) {
                if (isset ($tempHeaders[$header['label']])) {
                    $header['children'] = $tempHeaders[$header['label']];
                }
            }

            // Return success response with formatted headers
            return response()->json([
                'status' => 'success',
                'message' => 'Headers retrieved successfully.',
                'data' => $formattedHeaders,
            ], 200);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve headers.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CMS/HeadersAdd');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'headers.label' => 'required|string|max:255',
            'headers.route' => 'required|string|max:255',
        ], [
            'headers.label.required' => 'The label field is required.',
            'headers.label.string' => 'The label field must be a string.',
            'headers.label.max' => 'The label field must not be greater than :max characters.',
            'headers.route.required' => 'The route field is required.',
            'headers.route.string' => 'The route field must be a string.',
            'headers.route.max' => 'The route field must not be greater than :max characters.',
        ]);


        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Save headers
        $headerData = $request->input('headers');
        $header = new Header();
        $header->id = substr(Uuid::uuid4()->toString(), 0, 8);
        $header->label = $headerData['label'];
        $header->route = $headerData['route'];
        $header->save();

        // Save children headers
        $childrenHeadersData = $request->input('childrenHeaders');
        foreach ($childrenHeadersData as $childHeaderData) {
            $childHeader = new Header();
            $childHeader->id = substr(Uuid::uuid4()->toString(), 0, 8);
            $childHeader->label = $childHeaderData['label'];
            $childHeader->route = $childHeaderData['route'];
            $childHeader->parent_label = $headerData['label']; // Assuming you want to link children headers to the parent header
            $childHeader->save();
        }

        return redirect()->route('headers.index')->with('success', 'Data berhasil disimpan.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Header $header)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Header $header)
    {
        return Inertia::render('CMS/HeadersEdit', ['header' => $header]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'headers.label' => 'required|string|max:255',
            'headers.route' => 'required|string|max:255',
        ], [
            'headers.label.required' => 'The label field is required.',
            'headers.label.string' => 'The label field must be a string.',
            'headers.label.max' => 'The label field must not be greater than :max characters.',
            'headers.route.required' => 'The route field is required.',
            'headers.route.string' => 'The route field must be a string.',
            'headers.route.max' => 'The route field must not be greater than :max characters.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Find the header to update
        $header = DB::table('headers')->where('id', $id)->first();

        if (!$header) {
            return redirect()->back()->with('error', 'Header not found.');
        }

        // Update parent header
        DB::table('headers')->where('id', $id)->update([
            'label' => $request->input('headers.label'),
            'route' => $request->input('headers.route'),
        ]);

        // Update children headers if any
        $childrenHeadersData = $request->input('childrenHeaders');
        $removedChildrensId = $request->input('removedChildrensId');

        if ($childrenHeadersData !== null || $childrenHeadersData !== []) {

            foreach ($childrenHeadersData as $childHeaderData) {
                if (isset ($childHeaderData['id'])) {
                    DB::table('headers')->where('id', $childHeaderData['id'])->update([
                        'label' => $childHeaderData['label'],
                        'route' => $childHeaderData['route'],
                    ]);
                } else {
                    $childHeader = new Header();
                    $childHeader->id = substr(Uuid::uuid4()->toString(), 0, 8);
                    $childHeader->label = $childHeaderData['label'];
                    $childHeader->route = $childHeaderData['route'];
                    $childHeader->parent_label = $header->label; // Assuming you want to link children headers to the parent header
                    $childHeader->save();
                }

            }
        }
        if ($removedChildrensId !== null || $removedChildrensId !== []) {
            foreach ($removedChildrensId as $removedChildrenId) {
                DB::table('headers')->where('id', $removedChildrenId)->delete();
            }
        }

        return redirect()->route('headers.index')->with('success', 'Data berhasil diperbarui.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Header $header)
    {
        // Find all headers with the same parent_label as the selected header
        $relatedHeaders = DB::table('headers')->where('parent_label', $header->label)->get();

        // Delete all related headers
        foreach ($relatedHeaders as $relatedHeader) {
            DB::table('headers')->where('id', $relatedHeader->id)->delete();
        }

        // Delete the selected header
        DB::table('headers')->where('id', $header->id)->delete();

        // Redirect back to the index page with a success message
        return redirect()->route('headers.index')->with('success', 'Header and related headers deleted successfully.');
    }

}