<template>
  <div class="auth-bg">
    <div class="center">
      <slot />
    </div>
    <footer class="footer">
      <div class="links">
        <a href="#">使用条款</a>
        <span>·</span>
        <a href="#">隐私政策</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.auth-bg {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(1100px 620px at 72% 8%, rgba(79, 183, 165, 0.28), transparent 60%),
    radial-gradient(900px 520px at 20% 66%, rgba(215, 168, 95, 0.18), transparent 62%),
    linear-gradient(135deg, var(--wf-bg-deep), var(--wf-bg), #0e1714);
  position: relative;
  overflow: hidden;
}
.auth-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 245, 218, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 245, 218, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(circle at center, black, transparent 72%);
  pointer-events: none;
}
.center { width: 420px; max-width: 92vw; position: relative; z-index: 1; }
.footer { position: absolute; bottom: 24px; color: var(--wf-text-muted); z-index: 1; }
.links { display: flex; gap: 8px; }
.links a { color: var(--wf-text); text-decoration: none; }
.links a:hover { color: var(--wf-mint); }
</style>