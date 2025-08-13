<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <title inertia>{{ setting('seo.title', config('app.name', 'Laravel')) }}</title>
    <meta name="description" content="{{ setting('seo.description', 'Deskripsi default website') }}">
    <meta name="keywords" content="{{ setting('seo.keywords', 'laundry, cepat, terjangkau') }}">

    <link rel="icon" type="image/png" href="{{ asset('storage/' . setting('general.favicon')) }}" />
    <link rel="shortcut icon" href="{{ asset('storage/' . setting('general.logo')) }}" type="image/x-icon">

    <meta property="og:image" content="{{ asset('storage/' . setting('general.logo')) }}">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
