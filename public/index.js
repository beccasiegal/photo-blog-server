<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Momentary Pause</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel="stylesheet" href="index.css">
    <script src="https://code.jquery.com/jquery-3.3.1.js"integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container">
        <h1>Photo blog</h1>
        <p>Choose a post to view</p>

     <div class form> <form id="js-form">
           
        </form>
</div>
        <p id="js-error-message" class="error-message"></p>
        <section id="results" class="hidden">
          <h2>Search results</h2>
          <div id="results-list" aria-live="polite">
          </div>
          <h2>More articles</h2>
          <div id="articles-results" aria-live="polite"> 

          </div>
        </section>
    </div>
    <script src="script.js"></script>
</body>
</html>