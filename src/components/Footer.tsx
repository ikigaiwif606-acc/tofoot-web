import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-card-border bg-card-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚽</span>
              <span className="text-lg font-bold">
                ToFoot <span className="text-accent">火光足球</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">
              法國人在台灣，用中文帶你看懂歐洲足球。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">導覽</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/videos" className="text-sm text-muted hover:text-accent transition-colors">影片</Link></li>
              <li><Link href="/blog" className="text-sm text-muted hover:text-accent transition-colors">文章</Link></li>
              <li><Link href="/about" className="text-sm text-muted hover:text-accent transition-colors">關於</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">社群</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="https://www.youtube.com/@ToFootwn" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-accent transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/tofu_twn/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">聯繫</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-muted">tofudafucontact@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-card-border pt-6 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} ToFoot 火光足球. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
