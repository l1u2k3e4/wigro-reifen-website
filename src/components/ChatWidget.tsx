// src/components/ChatWidget.tsx
// WIGRO Chat-Widget — React Wrapper für n8n Chat-Widget v2.3

import { useEffect } from 'react'

const CHAT_CONFIG = {
  webhook: {
    url: 'https://n8n.srv1233417.hstgr.cloud/webhook/6c6aa35e-d0fe-4162-9389-94e29a14864e/chat',
    route: 'general',
  },
  branding: {
    logo: '',
    name: 'WIGRO-Reifen',
    welcomeText: 'Willkommen bei WIGRO-Reifen Witten! 🚗 Wie können wir Ihnen helfen?',
    responseTimeText: 'Montage · Verkauf · Service',
  },
  style: {
    primaryColor: '#1e2d4d',
    secondaryColor: '#c5e030',
    position: 'right',
    backgroundColor: '#f4f5f7',
    fontColor: '#1e2d4d',
  },
}

export default function ChatWidget() {
  useEffect(() => {
    ;(window as any).ChatWidgetConfig = CHAT_CONFIG

    ;(function () {
      'use strict'

      const esc = (s: unknown) =>
        String(s)
          .split('&').join('&amp;')
          .split('<').join('&lt;')
          .split('>').join('&gt;')
          .split('"').join('&quot;')
          .split("'").join('&#039;')

      const $ = (sel: string, root: Document | Element = document) =>
        root.querySelector(sel)

      const cfg = (window as any).ChatWidgetConfig || {}
      const webhookUrl   = cfg?.webhook?.url   || ''
      const webhookRoute = cfg?.webhook?.route  || 'general'
      const brandName    = cfg?.branding?.name            || 'WIGRO Reifen'
      const logoUrl      = cfg?.branding?.logo            || ''
      const welcomeText  = cfg?.branding?.welcomeText     || 'Willkommen bei WIGRO Reifen! Wie können wir Ihnen helfen?'
      const responseTime = cfg?.branding?.responseTimeText || 'Montage · Verkauf · Service'
      const primary = cfg?.style?.primaryColor    || '#2e3d56'
      const accent  = cfg?.style?.secondaryColor  || '#c8e632'
      const bgColor = cfg?.style?.backgroundColor || '#f4f5f7'
      const font    = cfg?.style?.fontColor       || '#2e3d56'
      const pos     = (cfg?.style?.position || 'right').toLowerCase() === 'left' ? 'left' : 'right'

      const css = `
/* ========== WIGRO Chat Widget v2.3 ========== */

.wigro-chat *,
.wigro-chat *::before,
.wigro-chat *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.wigro-chat {
  --wg-primary: ${primary};
  --wg-accent:  ${accent};
  --wg-bg:      ${bgColor};
  --wg-font:    ${font};
  font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--wg-font);
}

/* ── Container ── */
.wigro-chat .wg-container {
  position: fixed;
  bottom: 24px;
  ${pos}: 24px;
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  align-items: ${pos === 'right' ? 'flex-end' : 'flex-start'};
}

/* ── FAB Button ── */
.wigro-chat .wg-fab {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  display: grid;
  place-items: center;
  background: var(--wg-primary);
  box-shadow: 0 6px 24px rgba(30, 45, 77, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.wigro-chat .wg-fab:hover {
  transform: scale(1.07);
  box-shadow: 0 8px 30px rgba(30, 45, 77, 0.45);
}

.wigro-chat .wg-fab svg {
  width: 28px;
  height: 28px;
  fill: var(--wg-accent);
  transition: opacity 0.2s, transform 0.2s;
}

.wigro-chat .wg-fab .wg-icon-close {
  position: absolute;
  opacity: 0;
  transform: rotate(-90deg);
}

.wigro-chat .wg-fab.active .wg-icon-chat {
  opacity: 0;
  transform: rotate(90deg);
}

.wigro-chat .wg-fab.active .wg-icon-close {
  opacity: 1;
  transform: rotate(0deg);
}

.wigro-chat .wg-fab::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--wg-accent);
  opacity: 0;
  animation: wgPulse 2.5s ease-out infinite;
}

.wigro-chat .wg-fab.active::before {
  animation: none;
  opacity: 0;
}

@keyframes wgPulse {
  0%   { transform: scale(1);    opacity: 0.6; }
  100% { transform: scale(1.35); opacity: 0; }
}

/* ── Panel (Desktop) ── */
.wigro-chat .wg-panel {
  width: min(390px, calc(100vw - 48px));
  height: min(580px, calc(100vh - 120px));
  border-radius: 18px;
  overflow: hidden;
  display: none;
  flex-direction: column;
  margin-bottom: 14px;
  background: var(--wg-bg);
  box-shadow: 0 20px 60px rgba(30, 45, 77, 0.25);
  animation: wgSlideUp 0.3s cubic-bezier(0.22, 0.68, 0, 1);
}

.wigro-chat .wg-panel.open {
  display: flex;
}

@keyframes wgSlideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── Header ── */
.wigro-chat .wg-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  background: var(--wg-primary);
  color: #fff;
  flex-shrink: 0;
  position: relative;
}

.wigro-chat .wg-header::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 4px;
  background: var(--wg-accent);
}

.wigro-chat .wg-header-logo {
  width: 40px; height: 40px;
  border-radius: 10px;
  object-fit: cover;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
  border: 1.5px solid rgba(197,224,48,0.3);
}

.wigro-chat .wg-header-info {
  display: flex; flex-direction: column; gap: 2px; min-width: 0;
}

.wigro-chat .wg-header-info strong {
  font-size: 16px; font-weight: 700; letter-spacing: 0.3px;
}

.wigro-chat .wg-header-info span {
  font-size: 11px; opacity: 0.75; font-weight: 600;
  letter-spacing: 0.8px; text-transform: uppercase;
  color: var(--wg-accent);
}

.wigro-chat .wg-status {
  display: inline-block;
  width: 8px; height: 8px; border-radius: 50%;
  background: #4ade80; margin-right: 6px;
  box-shadow: 0 0 0 2px rgba(74,222,128,0.3);
  animation: wgBlink 2s ease infinite;
}

@keyframes wgBlink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.5; }
}

.wigro-chat .wg-close {
  margin-left: auto;
  background: transparent; border: 0; color: #fff;
  cursor: pointer;
  width: 34px; height: 34px; border-radius: 10px;
  display: grid; place-items: center;
  font-size: 18px;
  transition: background 0.15s;
}

.wigro-chat .wg-close:hover {
  background: rgba(255,255,255,0.12);
}

/* ── Nachrichten ── */
.wigro-chat .wg-messages {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.wigro-chat .wg-msg {
  max-width: 84%;
  padding: 11px 15px;
  font-size: 14px;
  line-height: 1.55;
  word-wrap: break-word;
  animation: wgFadeIn 0.25s ease;
}

@keyframes wgFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.wigro-chat .wg-msg.bot {
  align-self: flex-start;
  background: #fff;
  border: 1px solid rgba(30,45,77,0.07);
  border-radius: 4px 16px 16px 16px;
  color: var(--wg-font);
}

.wigro-chat .wg-msg.bot p        { margin: 0 0 8px; }
.wigro-chat .wg-msg.bot p:last-child { margin-bottom: 0; }
.wigro-chat .wg-msg.bot ul,
.wigro-chat .wg-msg.bot ol       { margin: 4px 0 8px 18px; }
.wigro-chat .wg-msg.bot strong   { font-weight: 700; }
.wigro-chat .wg-msg.bot a {
  color: var(--wg-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.wigro-chat .wg-msg.bot code {
  background: rgba(30,45,77,0.06);
  padding: 1px 5px; border-radius: 4px; font-size: 13px;
}

.wigro-chat .wg-msg.user {
  align-self: flex-end;
  background: var(--wg-primary);
  color: #fff;
  border-radius: 16px 16px 4px 16px;
  white-space: pre-wrap;
}

.wigro-chat .wg-typing {
  align-self: flex-start;
  display: none;
  gap: 5px;
  padding: 14px 20px;
  background: #fff;
  border: 1px solid rgba(30,45,77,0.07);
  border-radius: 4px 16px 16px 16px;
}

.wigro-chat .wg-typing.visible { display: flex; }

.wigro-chat .wg-typing span {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--wg-primary); opacity: 0.3;
  animation: wgDot 1.2s infinite ease-in-out;
}

.wigro-chat .wg-typing span:nth-child(2) { animation-delay: 0.15s; }
.wigro-chat .wg-typing span:nth-child(3) { animation-delay: 0.3s; }

@keyframes wgDot {
  0%,60%,100% { transform: translateY(0); opacity: 0.3; }
  30%         { transform: translateY(-5px); opacity: 0.9; }
}

/* ── Eingabezeile ── */
.wigro-chat .wg-composer {
  display: flex;
  gap: 10px;
  padding: 14px 16px;
  background: #fff;
  border-top: 1px solid rgba(30,45,77,0.06);
  flex-shrink: 0;
}

.wigro-chat .wg-input {
  flex: 1;
  border: 1.5px solid rgba(30,45,77,0.12);
  border-radius: 12px;
  padding: 11px 14px;
  outline: none;
  font-size: 14px;
  color: var(--wg-font);
  font-family: 'Jost', sans-serif;
  transition: border-color 0.15s, box-shadow 0.15s;
  background: #fff;
}

.wigro-chat .wg-input::placeholder { color: #999; }

.wigro-chat .wg-input:focus {
  border-color: var(--wg-accent);
  box-shadow: 0 0 0 3px rgba(200,230,50,0.2);
}

.wigro-chat .wg-send {
  border: 0; border-radius: 12px;
  padding: 11px 20px;
  cursor: pointer; font-weight: 700;
  font-size: 14px; font-family: 'Jost', sans-serif;
  letter-spacing: 0.3px;
  background: var(--wg-accent);
  color: var(--wg-primary);
  transition: filter 0.15s, transform 0.1s;
}

.wigro-chat .wg-send:hover { filter: brightness(1.08); }
.wigro-chat .wg-send:active { transform: scale(0.96); }

.wigro-chat .wg-footer {
  text-align: center;
  padding: 6px 0 10px;
  font-size: 10.5px;
  color: #b0b0b0;
  background: #fff;
  flex-shrink: 0;
}

.wigro-chat .wg-messages::-webkit-scrollbar       { width: 5px; }
.wigro-chat .wg-messages::-webkit-scrollbar-thumb  { background: rgba(30,45,77,0.12); border-radius: 9px; }
.wigro-chat .wg-messages::-webkit-scrollbar-track  { background: transparent; }

/* Chat ausblenden wenn Mobile-Menü offen */
body.menu-open .wigro-chat {
  display: none !important;
}

/* ══ TABLET + MOBILE (Sticky CTA sichtbar — unter lg = < 1024px) ══ */
@media (max-width: 1023px) {

  /* Container höher positionieren damit FAB über der StickyCTABar liegt */
  .wigro-chat .wg-container {
    bottom: 96px;
  }

}

/* ══ MOBILE ══ */
@media (max-width: 500px) {

  .wigro-chat .wg-container {
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    padding: 0;
    align-items: stretch;
  }

  /* Panel öffnet in oberer Bildschirmhälfte — über der StickyCTABar */
  .wigro-chat .wg-panel {
    position: fixed;
    top: 80px;
    bottom: auto;
    left: 8px;
    right: 8px;
    width: auto;
    height: calc(50vh - 40px);
    max-height: calc(50vh - 40px);
    border-radius: 16px;
    margin-bottom: 0;
    box-shadow: 0 8px 32px rgba(30,45,77,0.25);
  }

  .wigro-chat .wg-panel.wg-keyboard-open {
    top: 0;
    height: auto;
    border-radius: 0;
  }

  .wigro-chat .wg-messages {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 8px 12px 10px;
  }

  .wigro-chat .wg-header { padding: 12px 16px; }
  .wigro-chat .wg-header-info strong { font-size: 15px; }

  .wigro-chat .wg-composer {
    padding: 10px 12px;
    padding-bottom: max(10px, env(safe-area-inset-bottom));
    gap: 8px;
    flex-shrink: 0;
  }

  .wigro-chat .wg-input { font-size: 16px; padding: 10px 12px; }
  .wigro-chat .wg-send  { padding: 10px 16px; font-size: 13px; }
  .wigro-chat .wg-footer { display: none; }

  /* FAB über der StickyCTABar (~64px) + 16px Padding + 16px Abstand = 96px */
  .wigro-chat .wg-fab {
    position: fixed;
    bottom: 96px;
    right: 16px;
    width: 56px;
    height: 56px;
    z-index: 2147483647;
  }

  .wigro-chat .wg-fab svg { width: 24px; height: 24px; }
}
`

      const styleEl = document.createElement('style')
      styleEl.textContent = css
      document.head.appendChild(styleEl)

      const root = document.createElement('div')
      root.className = 'wigro-chat'

      root.innerHTML = `
    <div class="wg-container">
      <div class="wg-panel" role="dialog" aria-label="WIGRO Reifen Chat">
        <div class="wg-header">
          ${logoUrl ? `<img class="wg-header-logo" src="${esc(logoUrl)}" alt="Logo" />` : ''}
          <div class="wg-header-info">
            <strong>${esc(brandName)}</strong>
            <span><span class="wg-status"></span>${esc(responseTime)}</span>
          </div>
          <button class="wg-close" type="button" aria-label="Chat schließen">✕</button>
        </div>
        <div class="wg-messages">
          <div class="wg-typing" aria-label="Schreibt …">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="wg-composer">
          <input class="wg-input" type="text"
                 placeholder="Ihre Nachricht …"
                 aria-label="Nachricht eingeben" />
          <button class="wg-send" type="button">Senden</button>
        </div>
        <div class="wg-footer">WIGRO Reifen Witten</div>
      </div>
      <button class="wg-fab" type="button" aria-label="Chat öffnen">
        <svg class="wg-icon-chat" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
        </svg>
        <svg class="wg-icon-close" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" fill="none"/>
        </svg>
      </button>
    </div>
  `

      document.body.appendChild(root)

      const panel    = $('.wg-panel',    root) as HTMLElement
      const fab      = $('.wg-fab',      root) as HTMLElement
      const closeBtn = $('.wg-close',    root) as HTMLElement
      const messages = $('.wg-messages', root) as HTMLElement
      const typing   = $('.wg-typing',   root) as HTMLElement
      const input    = $('.wg-input',    root) as HTMLInputElement
      const sendBtn  = $('.wg-send',     root) as HTMLElement

      let sessionId = sessionStorage.getItem('wg_session')
      if (!sessionId) {
        sessionId = crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(36) + Math.random().toString(36).slice(2)
        sessionStorage.setItem('wg_session', sessionId)
      }

      function renderMarkdown(text: string): string {
        const markedLib = (window as any).marked
        if (markedLib && markedLib.parse) {
          try { return markedLib.parse(text, { breaks: true }) } catch (_) {}
        }
        return esc(text).replace(/\n/g, '<br>')
      }

      function addMsg(text: string, who: string) {
        const div = document.createElement('div')
        div.className = `wg-msg ${who}`
        if (who === 'bot') { div.innerHTML = renderMarkdown(text) }
        else { div.textContent = text }
        messages.insertBefore(div, typing)
        messages.scrollTop = messages.scrollHeight
      }

      addMsg(welcomeText, 'bot')

      function open()   { panel.classList.add('open');    fab.classList.add('active');    input.focus() }
      function close()  { panel.classList.remove('open'); fab.classList.remove('active'); input.blur() }
      function toggle() { panel.classList.contains('open') ? close() : open() }

      fab.addEventListener('click', toggle)
      closeBtn.addEventListener('click', close)

      /* ── iOS Keyboard Handling ── */
      if (window.visualViewport) {
        const initialHeight = window.innerHeight

        function handleViewportResize() {
          if (!panel.classList.contains('open')) return
          const vv = window.visualViewport!
          const keyboardOpen = (initialHeight - vv.height) > 100

          if (keyboardOpen && window.innerWidth <= 500) {
            panel.classList.add('wg-keyboard-open')
            panel.style.height = vv.height + 'px'
            panel.style.top = vv.offsetTop + 'px'
          } else {
            panel.classList.remove('wg-keyboard-open')
            panel.style.height = ''
            panel.style.top = ''
          }
          messages.scrollTop = messages.scrollHeight
        }

        window.visualViewport.addEventListener('resize', handleViewportResize)
        window.visualViewport.addEventListener('scroll', handleViewportResize)
      }

      async function sendMessage() {
        const text = input.value.trim()
        if (!text) return

        addMsg(text, 'user')
        input.value = ''
        input.focus()

        typing.classList.add('visible')
        messages.scrollTop = messages.scrollHeight

        try {
          const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'sendMessage',
              sessionId: sessionId,
              route: webhookRoute,
              chatInput: text,
            }),
          })

          if (!res.ok) throw new Error('HTTP ' + res.status)
          const data = await res.json()

          let reply: string
          if (Array.isArray(data) && data[0]?.output) { reply = data[0].output }
          else if (typeof data?.output === 'string')  { reply = data.output }
          else if (typeof data?.text === 'string')    { reply = data.text }
          else if (typeof data === 'string')          { reply = data }
          else { reply = 'Entschuldigung, ich konnte die Antwort nicht verarbeiten.' }

          addMsg(reply, 'bot')
        } catch (err) {
          console.error('WIGRO Chat Error:', err)
          addMsg('Entschuldigung – die Verbindung konnte nicht hergestellt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.', 'bot')
        } finally {
          typing.classList.remove('visible')
        }
      }

      sendBtn.addEventListener('click', sendMessage)
      input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
        if (e.key === 'Escape') close()
      })
    })()

    return () => {
      const widgetRoot = document.querySelector('.wigro-chat')
      if (widgetRoot) widgetRoot.remove()
      document.querySelectorAll('style').forEach((s) => {
        if (s.textContent?.includes('.wigro-chat')) s.remove()
      })
    }
  }, [])

  return null
}
