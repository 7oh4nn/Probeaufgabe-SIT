<script setup>

</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
    <a href="/">Impressum</a>
    <a href="/">AGB</a>
    <a href="/">Datenschutzbestimmungen</a>
    <a href="/">Gesetzliche Zusatzinformationen</a>
    <a href="/">Compliance</a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  background-color: var(--clr-grey-600);
  padding: 18px 0;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: var(--size-max-content);
    margin: 0 auto;
  }

  a {
    color: var(--clr-white);
    text-decoration: none;
    padding: 16px 8px;
  }
}
</style>