<?php

namespace App\Http\Controllers\Feeds;

use App\Http\Controllers\Controller;
use App\Models\Feeds\Feed;
use App\Models\Feeds\FeedGallery;
use App\Models\Feeds\Sekolah;
use App\Models\Feeds\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use Ramsey\Uuid\Uuid;

class FeedController extends Controller
{
    public function index()
    {
        $feeds = Feed::with('feedsGallery')->get();
        $sekolah = Sekolah::get();
        $prodi = ProgramStudi::get();
        return Inertia::render('Feed/Index', ['feeds' => $feeds, 'schools' => $sekolah, 'prodi' => $prodi]);
    }

    public function getSekolahData()
    {
        $sekolahData = Sekolah::all();

        return response()->json($sekolahData);
    }

    public function getProgramStudiData()
    {
        $programStudiData = ProgramStudi::all();

        return response()->json($programStudiData);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'nullable',
            'id_sekolah' => 'nullable',
            'id_prodi' => 'nullable',
            'nama' => 'required',
            'jenis' => 'required',
            'keterangan' => 'nullable',
            'cp' => 'required',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'mulai_tayang' => 'required',
            'selesai_tayang' => 'required',
        ]);

        $feedData = $request->except(['images']);
        $jenis = $request->jenis;

        $feed = Feed::create($feedData);

        foreach ($request->file('images') as $image) {
            $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();

            $path = 'assets/feeds_gallery/' . $jenis . '/' . $imageName;

            $image->storeAs('/' . $jenis, $imageName, ['disk' => 'feeds_gallery']);

            $idFeedGallery = Uuid::uuid4()->toString();

            FeedGallery::create([
                'id_feed' => $feed->id_feed,
                'id_feed_gallery' => $idFeedGallery,
                'url' => $path,
            ]);

            $feed->update(['url_media' => $path]);
        }

        return redirect()->route('feeds.index')->withSuccess('success');
    }




    public function show(string $id)
    {
        $feed = Feed::with('feedsGallery')->findOrFail($id);
        return Inertia::render('Feed/Show', ['feed' => $feed]);
    }

    public function update(Request $request, string $id)
    {
        $feed = Feed::findOrFail($id);

        $request->validate([
            'id_user' => 'nullable',
            'id_prodi' => 'nullable',
            'nama' => 'required',
            'jenis' => 'required',
            'keterangan' => 'nullable',
            'cp' => 'required',
            'mulai_tayang' => 'nullable',
            'selesai_tayang' => 'required',
        ]);

        $feed->update($request->all());

        return redirect()->route('feeds.index')
            ->with('success', 'Feed updated successfully');
    }

    public function destroy(string $id)
    {
        // Find the feed record
        $feed = Feed::where('id_feed', $id)->firstOrFail();

        // Find and delete related feed galleries
        $feedGalleries = FeedGallery::where('id_feed', $id)->get();
        foreach ($feedGalleries as $feedGallery) {
            // Extract the filename from the URL
            $url = $feedGallery->url;

            $fileToDelete = Str::replaceFirst("assets/feeds_gallery/", "", "/$url");

            // Delete the file from storage
            Storage::disk('feeds_gallery')->delete($fileToDelete);

            // Delete the feed gallery record
            $feedGallery->delete();
        }

        // Delete the feed record
        $feed->delete();

        return redirect()->route('feeds.index')
            ->with('success', 'Feed, associated galleries, and files deleted successfully');
    }
}