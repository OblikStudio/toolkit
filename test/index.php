<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Document</title>

	<style>
		.ob-accordion-item {
			height: var(--ob-height);
			transition: height 0.3s ease;
			overflow: hidden;
		}

		.ob-accordion-item:not(.is-active) {
			height: 0px;
		}
	</style>
</head>

<body>
	<div id="faq" class="ob-accordion">
		<div>
			<div style="display: flex;">
				<span>title</span>
				<button class="ob-accordion-toggle">toggle 1</button>
			</div>
			<div class="ob-accordion-item">
				<div>item 1</div>
			</div>
		</div>
		<div>
			<div style="display: flex;">
				<span>title</span>
				<button class="ob-accordion-toggle">toggle 2</button>
			</div>
			<div class="ob-accordion-item">
				<div>item 2</div>
			</div>
		</div>
		<div>
			<div style="display: flex;">
				<span>title</span>
				<button class="ob-accordion-toggle">toggle 3</button>
			</div>
			<div class="ob-accordion-item">
				<div>item 3</div>
			</div>
		</div>
	</div>

	<script src="http://localhost/toolkit/test/accordion.js"></script>
</body>

</html>
