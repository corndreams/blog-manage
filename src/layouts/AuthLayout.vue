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
  background: radial-gradient(1200px 600px at 70% 10%, rgba(59,130,246,0.35), transparent 60%),
              radial-gradient(900px 500px at 20% 60%, rgba(14,165,233,0.25), transparent 60%),
              #0f1e3a;
  position: relative;
  overflow: hidden;
}
.auth-bg::before {
  content: '';
  position: absolute;
  left: 10%;
  top: 30%;
  width: 320px;
  height: 320px;
  background: radial-gradient(closest-side, rgba(255,255,255,0.06), transparent);
  filter: blur(2px);
}
.center { width: 420px; max-width: 92vw; }
.footer { position: absolute; bottom: 24px; color: #94a3b8; }
.links { display: flex; gap: 8px; }
.links a { color: #cbd5e1; text-decoration: none; }
</style>