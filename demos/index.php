<!DOCTYPE html>
<html>
<head>
  <title>Testing</title>
  <style type="text/css">
    html, body {
      font-family: sans-serif;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 40rem;
      margin: 0 auto;
    }
  </style>
</head>
<body style="overflow-x: hidden;">
  <iframe src="./test.php"></iframe>

  <p style="width: 120vw;">wrapper</p>

  <div class="container">
    <p mb-scrollto="target:#last; easing:easeOutQuint">last</p>
    <?php include './content.php' ?>

    <div style="width: 300px; height: 200px; overflow: auto;">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    </div>

    <?php include './content.php' ?>
  </div>

  <script src="../dist/minibits.js"></script>
</body>
</html>