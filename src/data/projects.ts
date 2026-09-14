export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectReceipt {
  title: string;
  file: string;
  code: string;
  explanation: string;
  note?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  isPrimary?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  timeline: string;
  status: string;
  stack: string[];
  metrics: ProjectMetric[];
  problem: string;
  architectureDiagram?: string;
  architectureDetails: string[];
  receipt: ProjectReceipt;
  takeaways: string[];
  links: ProjectLink[];
  media?: {
    type: 'phone-pair' | 'diagram' | 'phone-single' | 'rack';
    images?: { src: string; alt: string }[];
  };
}

export const projects: Project[] = [
  {
    slug: 'trippe',
    title: 'Trippé',
    subtitle: 'A vibe-first travel app where every recommendation is priced against real harvested data before it is shown &mdash; refusing to state any figure it cannot trace.',
    category: 'Production Flagship',
    role: 'Sole Author &middot; Backend Infrastructure, iOS Client & Cost Engine',
    timeline: 'Apr 2026 &ndash; Sep 2026',
    status: 'Live on App Store &middot; Submission Ready',
    stack: ['Cloudflare Workers', 'TypeScript', 'Supabase', 'PostgreSQL', 'SwiftUI', 'Apple PCC', 'Vitest'],
    metrics: [
      { label: 'Backend Commits', value: '599', detail: 'Single author repository' },
      { label: 'iOS Commits', value: '250', detail: 'Native SwiftUI app' },
      { label: 'Backend Test Ratio', value: '0.9 : 1', detail: '123 test files vs 144 source files' },
      { label: 'Runtime Dependencies', value: '1', detail: 'Single dependency: jose' },
      { label: 'PCC Benchmark Probes', value: '42', detail: 'Measured prompt & truncation runs' },
    ],
    problem:
      'Most travel planners either display stale aggregated averages or rely on unconstrained LLMs that hallucinate pleasant-sounding numbers. A recommendation that quotes an untraceable price is worse than no recommendation at all: travelers build expectations on numbers that do not exist.',
    architectureDiagram: `Trippe-iOS (SwiftUI 9-step flow)
  │  X-Trippy-Secret + Supabase JWT
  ▼
trippy-proxy (Cloudflare Worker) ──── cron */15 min: demand queues
  /v1/recommendation[/stream] SSE      → Exa harvest → verify → Layer 0 rows
  LLM tiers: Gemini → DeepSeek         ($10/day shared ceiling)
  menu constraint ← feasible set
  /v1/flights (Travelpayouts grid → SerpApi), weather, cities…
  ▼
Supabase Postgres ── Layer 0 (append-only): price_observation, fx_rate
                  └ Layer 1 (regenerable): city_price_level, city_seasonality`,
    architectureDetails: [
      'Provenance as a Schema Constraint: Layer 0 is strictly append-only. Migration 0006 requires source_quote text not null with a non-empty check. An extraction that cannot quote its source document is rejected at the database level rather than managed via prompt politeness.',
      'Refusal as a First-Class Outcome: A destination that fails the verification ladder or confidence floor produces zero rows (revoke_* migrations), never an estimate.',
      'Budget Independence Property Test: The test suite sweeps $500–$20,000 budgets and asserts exactly three tier outputs; any leak of user budget into pricing arithmetic fails the build.',
      'Cost-Aware LLM Engineering: Gemini-to-DeepSeek tiering behind a menu constraint derived from a feasible set. Demand queues drain under an explicit $10/day ceiling.',
      'Private Cloud Compute (PCC): Measured 42 probe runs comparing on-device Foundation Models with Apple PCC. Found on-device silently truncated long structured outputs at 8,192 tokens without an error; PCC handles 32,768 tokens, 2× faster, with strict schemas that forbid price emission.',
    ],
    receipt: {
      title: 'Schema-Level Provenance & Refusal Ladder',
      file: 'supabase/migrations/0006_price_provenance.sql',
      code: `create table if not exists public.price_observation (
  id             bigint generated always as identity primary key,
  observed_at    timestamptz   not null default now(),
  city_id        text          not null,
  item_class     text          not null check (item_class in (
                   'meal_street', 'meal_casual', 'meal_nice', 'coffee',
                   'transit_single', 'taxi_10km', 'attraction_entry',
                   'day_tour', 'lodging_hostel_bed', 'lodging_3star', 'lodging_4star')),
  local_amount   numeric(12,2) not null check (local_amount >= 0),
  local_currency text          not null check (char_length(local_currency) = 3),
  usd_amount     numeric(10,2) not null check (usd_amount >= 0),
  -- The verbatim span the number was read from:
  source_quote   text          not null check (char_length(source_quote) > 0),
  method         text          not null check (method in ('exa_gemma', 'manual', 'api')),
  raw_excerpt    jsonb
);

comment on table public.price_observation is
  'Append-only record of every price extracted from a source document. IMMUTABLE: never UPDATE, never DELETE.';`,
      explanation:
        'Because source_quote has a NOT NULL constraint with a non-empty character check, hallucinated extractions cannot be stored. If an LLM cannot quote the page text from which the price was read, PostgreSQL aborts the write.',
      note: 'The entire Cloudflare Worker backend runs with exactly one runtime dependency (jose for JWT validation). Everything else is written with web standards.',
    },
    takeaways: [
      'Database constraints are more reliable than prompt engineering for LLM guardrails.',
      'Refusal is a legitimate product feature: stating nothing is better than inventing a price.',
      'Apple PCC enables structured inference at scale without exposing sensitive financial arithmetic.',
    ],
    links: [
      { label: 'View on App Store', url: 'https://apps.apple.com/app/id6766072256', isPrimary: true },
    ],
    media: {
      type: 'phone-pair',
      images: [
        { src: '/images/trippe/destination-sao-miguel.webp', alt: 'Trippé São Miguel destination view' },
        { src: '/images/trippe/estimated-spending.webp', alt: 'Trippé verified cost breakdown screen' },
      ],
    },
  },
  {
    slug: 'dvld',
    title: 'DVLD &mdash; Driving License System',
    subtitle: 'A 28,541-line three-tier desktop system built with C# WinForms and SQL Server &mdash; the capstone of a 21-month backend fundamentals curriculum.',
    category: 'Desktop & Database Architecture',
    role: 'Sole Author &middot; Full Architecture, Data Access & Domain Logic',
    timeline: 'Apr 2025 &ndash; Jun 2025',
    status: 'Completed Capstone Project',
    stack: ['C# / .NET', 'WinForms', 'SQL Server', 'T-SQL', 'Parameterized ADO.NET', 'Git'],
    metrics: [
      { label: 'Lines of Code', value: '28,541', detail: '134 C# source files' },
      { label: 'Database Relations', value: '25', detail: 'Foreign-key constraints in SQL Server' },
      { label: 'Architectural Layers', value: '3', detail: 'Physical separation into 3 class libraries' },
      { label: 'ORM Dependencies', value: '0', detail: 'Explicit parameterized ADO.NET' },
    ],
    problem:
      'Enterprise government licensing systems require high transactional integrity across interconnected entities (Applications, Licenses, Drivers, Tests, Detained Licenses). Relying on heavy ORMs masks query performance and connection management, which I intentionally avoided to master raw database fundamentals.',
    architectureDiagram: `DVLD (Presentation Layer: Windows Forms, UserControls, Client-Side Validation)
  │  Data Transfer Objects & Domain Invocations
  ▼
DVLD_Buisness (Domain Layer: Business Rules, enMode State Pattern, RBAC)
  │  CRUD Operations & Transactional Requests
  ▼
DVLD_DataAccess (Data Layer: 100% Parameterized Async ADO.NET)
  │  SqlCommand, SqlDataReader, OpenAsync, ExecuteReaderAsync
  ▼
Microsoft SQL Server (25 Relational Foreign Keys, Constraints, Indexes)`,
    architectureDetails: [
      'Strict Three-Tier Separation: Code is physically split into three class libraries: DVLD (presentation), DVLD_Buisness (domain rules), and DVLD_DataAccess (ADO.NET execution). Presentation never communicates with data access directly.',
      'Parameterized Inline ADO.NET: Every query and command is fully parameterized with explicit SqlDbType assignments, guaranteeing zero SQL injection and predictable query execution plans without ORM overhead.',
      'Mode-Driven State Architecture: Domain classes implement an enMode { AddNew, Update } pattern rather than ambiguous mutation, maintaining clean object lifecycles.',
      'Complex Relational Schema: 25 foreign-key constraints enforce referential integrity across driver records, appointments, test passes, and license replacements.',
    ],
    receipt: {
      title: 'Parameterized Async ADO.NET Data Access',
      file: 'DVLD_DataAccess / clsDriverData.cs',
      code: `public static async Task<DriverDTO> GetDriverInfoByPersonIDAsync(int personID)
{
    DriverDTO driver = null;
    using (SqlConnection connection = new SqlConnection(clsDataAccessSettings.ConnectionString))
    {
        string query = @"SELECT DriverID, PersonID, CreatedByUserID, CreatedDate 
                         FROM Drivers WHERE PersonID = @PersonID";

        using (SqlCommand command = new SqlCommand(query, connection))
        {
            command.Parameters.Add("@PersonID", SqlDbType.Int).Value = personID;
            await connection.OpenAsync();

            using (SqlDataReader reader = await command.ExecuteReaderAsync())
            {
                if (await reader.ReadAsync())
                {
                    driver = new DriverDTO(
                        reader.GetInt32(reader.GetOrdinal("DriverID")),
                        reader.GetInt32(reader.GetOrdinal("PersonID")),
                        reader.GetInt32(reader.GetOrdinal("CreatedByUserID")),
                        reader.GetDateTime(reader.GetOrdinal("CreatedDate"))
                    );
                }
            }
        }
    }
    return driver;
}`,
      explanation:
        'All database queries use asynchronous parameterized execution with dedicated DTOs separating data shape from domain models. No stored procedures or ORMs were used, keeping database interaction explicit and inspectable.',
      note: 'The DVLD project was the largest system I had built at the time, completing a 21-month self-directed backend curriculum.',
    },
    takeaways: [
      'Building without an ORM teaches connection pooling, async I/O, and query plan discipline.',
      'A strict 3-tier structure makes a 28,000-line codebase maintainable and predictable.',
      'Domain state machines (enMode) eliminate accidental partial database updates.',
    ],
    links: [],
    media: {
      type: 'diagram',
      images: [
        { src: '/images/dvld/db-diagram.webp', alt: 'DVLD Relational Database Schema Diagram' },
      ],
    },
  },
  {
    slug: 'sortla',
    title: 'Sortla / ECOdyssey',
    subtitle: 'A waste-sorting kiosk using on-device YOLOv8 through Core ML, featuring an exponential decay belief engine that eliminated decision flicker.',
    category: 'Edge ML & Computer Vision',
    role: '5-Person Team &middot; Author of BeliefEngine, PCCJudge & Evaluation Harness',
    timeline: 'Aug 2026',
    status: 'Completed Challenge &middot; Apple Developer Academy',
    stack: ['Swift', 'Core ML', 'YOLOv8', 'Apple PCC', 'SwiftUI', 'XCTest'],
    metrics: [
      { label: 'Team Swift Files', value: '228', detail: '46 unit and integration test files' },
      { label: 'BeliefEngine LOC', value: '234', detail: 'Self-contained math engine' },
      { label: 'PCCJudge Module', value: '2,122', detail: '8 files routing edge ambiguity' },
      { label: 'Misclassification Rate', value: '1 / 7', detail: 'Down from 3/7 on legacy vote' },
    ],
    problem:
      'Real-time object detection models (like YOLOv8) run frame-by-frame and fluctuate wildly under lighting shifts or partial occlusions. Two legacy voting mechanisms produced frequent classification flips between organic, residual, and recyclable bins, causing kiosk indicator LEDs to flicker uncontrollably.',
    architectureDiagram: `Camera Video Feed (30 FPS)
  │
  ▼
Core ML YOLOv8 Segmentation Pipeline
  │ Raw noisy frame predictions
  ▼
BeliefEngine.swift (Exponential decay: 0.8s half-life + hysteresis margin lock)
  │ Smooth, stable confidence verdict
  ├── [Definite Verdict] ──► Kiosk LED Indicators & Bin Actuators
  │
  └── [Edge Uncertainty] ──► PCCJudge Module ──► Apple Private Cloud Compute`,
    architectureDetails: [
      'BeliefEngine.swift: Fuses frame-by-frame detections into time-decayed beliefs with an exponential half-life (0.8s). One noisy frame cannot reverse a classification built over multiple frames.',
      'Hysteresis Decision Gate: Enforces a margin threshold (0.15) before switching the active label, eliminating visual flickering on the kiosk display.',
      'Deterministic Bake-Off Harness: Replayed 7 real-world test scenarios comparing the legacy vote with the belief engine. Verified result: legacy produced 3 confidently wrong verdicts; belief engine reduced it to 1.',
      'PCCJudge Arbitration: Routes edge ambiguities to Apple Private Cloud Compute for second-opinion verdicts, saving auditable verdict records for future training dataset generation.',
    ],
    receipt: {
      title: 'Exponential Half-Life Belief Fusion & Hysteresis',
      file: 'waste-sort/Core/Detection/BeliefEngine.swift',
      code: `final class BeliefEngine {
    private let halfLife: TimeInterval = 0.8
    private let confidenceMargin: Float = 0.15
    private var beliefs: [WasteCategory: Float] = [:]
    private var lastTimestamp: TimeInterval = 0
    private(set) var lockedCategory: WasteCategory?

    func processFrame(detections: [Detection], at timestamp: TimeInterval) -> WasteCategory? {
        let dt = max(0, timestamp - lastTimestamp)
        lastTimestamp = timestamp

        // Apply exponential decay: e^(-dt / halfLife)
        let decayFactor = exp(-Float(dt / halfLife))
        for category in beliefs.keys {
            beliefs[category] = (beliefs[category] ?? 0) * decayFactor
        }

        // Accumulate current frame evidence
        for detection in detections {
            beliefs[detection.category, default: 0] += detection.confidence
        }

        // Hysteresis lock: requires top category to beat runner-up by confidenceMargin
        guard let top = beliefs.max(by: { $0.value < $1.value }) else { return nil }
        let runnerUp = beliefs.filter { $0.key != top.key }.values.max() ?? 0

        if top.value - runnerUp >= confidenceMargin {
            lockedCategory = top.key
        }
        return lockedCategory
    }
}`,
      explanation:
        'By integrating frame confidence over an exponential decay window, the decision engine acts as a low-pass filter for edge ML, converting jumpy YOLO predictions into stable physical actions.',
      note: 'The bake-off harness found a real bug in legacy voting, proving that honest self-measurement is the fastest path to quality.',
    },
    takeaways: [
      'Never trust raw per-frame ML detections directly for physical actuators or UI state.',
      'Exponential decay with hysteresis creates smooth temporal stability from noisy models.',
      'Deterministic replay harnesses turn subjective edge tests into measurable software proofs.',
    ],
    links: [],
  },
  {
    slug: 'academy-stickies',
    title: 'Academy Stickies',
    subtitle: 'A full-stack collaborative edge board built for and actively used by 200+ Apple Developer Academy cohort peers.',
    category: 'Full-Stack Edge Application',
    role: 'Sole Author &middot; Full Stack, Database Migrations & DevOps',
    timeline: 'Jul 2026 &ndash; Aug 2026',
    status: 'Live in Production &middot; Real Cohort Users',
    stack: ['Cloudflare Pages', 'Hono', 'Cloudflare D1 (SQLite)', 'Cloudflare R2', 'TypeScript', 'Vitest'],
    metrics: [
      { label: 'Authored Commits', value: '33 / 39', detail: 'Primary author and maintainer' },
      { label: 'Database Migrations', value: '9', detail: 'Tested schema versions in D1' },
      { label: 'Cohort Users', value: '200+', detail: 'Active peers in Bali cohort' },
      { label: 'Cold Start Latency', value: '0 ms', detail: 'V8 isolates at Cloudflare edge' },
    ],
    problem:
      'Academy peers needed a private, fast digital sticky wall for cohort feedback and peer kudos without the overhead of heavy commercial software (like Miro or Padlet) or slow traditional databases.',
    architectureDiagram: `Web Browser (Fast static SPA on Cloudflare Pages)
  │
  ▼
Cloudflare Edge Worker (Hono REST API)
  ├── Passwordless Magic-Link Authentication
  ├── Cloudflare D1 (Serverless SQLite with 9 schema migrations)
  └── Cloudflare R2 (Encrypted object storage for sticky attachments)`,
    architectureDetails: [
      'Edge Infrastructure: Deployed globally across Cloudflare Pages, Hono microframework, and D1 SQLite database, achieving instantaneous response times worldwide.',
      'Passwordless Auth: Magic-link email authentication ensures cohort security without storing passwords or managing third-party identity vendor subscriptions.',
      'Database Migrations: 9 discrete, tested SQL migrations ensuring schema evolution was rigorously verified rather than assumed.',
      'Object Storage Integration: Attachment uploads stream directly into Cloudflare R2 with signed verification tokens.',
    ],
    receipt: {
      title: 'Edge Route Handler & Magic-Link Session Verification',
      file: 'mo7morad/Academy-Stickies / src/routes/auth.ts',
      code: `import { Hono } from 'hono';
import { verifyMagicToken, createSession } from '../lib/auth';

const auth = new Hono<{ Bindings: Env }>();

auth.post('/verify', async (c) => {
  const { token } = await c.req.json<{ token: string }>();
  if (!token) return c.json({ error: 'Token required' }, 400);

  const email = await verifyMagicToken(c.env.DB, token);
  if (!email || !email.endsWith('@academy.local')) {
    return c.json({ error: 'Invalid or unauthorized cohort domain' }, 403);
  }

  const session = await createSession(c.env.DB, email);
  return c.json({ session, email });
});

export default auth;`,
      explanation:
        'The backend validates cryptographic magic-link tokens directly against Cloudflare D1 and restricts session generation to authorized cohort emails with zero third-party auth dependencies.',
      note: 'A small, complete proof that I ship production software other people use daily.',
    },
    takeaways: [
      'Cloudflare D1 and Hono enable zero-cold-start full-stack apps with minimal footprint.',
      'Magic-link authentication provides excellent UX while eliminating password attack vectors.',
      'Running software for your own peers forces immediate feedback and quality discipline.',
    ],
    links: [
      { label: 'Open App', url: 'https://academy-stickies.pages.dev', isPrimary: true },
      { label: 'GitHub Repository', url: 'https://github.com/mo7morad/Academy-Stickies' },
    ],
    media: {
      type: 'phone-single',
      images: [
        { src: '/images/stickies/gate.webp', alt: 'Academy Stickies magic-link login gate' },
      ],
    },
  },
  {
    slug: 'numo',
    title: 'Numo &mdash; Meal Analysis',
    subtitle: 'An iOS nutrition app that turns meal photos into structured SwiftData entities using Claude vision with strict typed error handling.',
    category: 'AI & Mobile Engineering',
    role: 'Sole Author &middot; 1-Week Apple Developer Academy Challenge',
    timeline: 'May 2026',
    status: 'Shipped Challenge &middot; Challenge 3',
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'Claude Vision API', 'Async/Await'],
    metrics: [
      { label: 'Development Cycle', value: '1 Week', detail: 'Rapid prototype to production' },
      { label: 'Error Cases Handled', value: '12', detail: 'Typed AnthropicMealAnalysisError enum' },
      { label: 'Model Temperature', value: '0', detail: 'Deterministic schema outputs' },
      { label: 'Architecture', value: 'Protocol DI', detail: 'SwiftData domain boundary' },
    ],
    problem:
      'Most generative AI mobile wrappers send ambiguous prompts and treat all network/model failures as a generic "AI failed" alert. Nutrition data requires reproducible, schema-compliant outputs and explicit error differentiation.',
    architectureDiagram: `User Captures Meal Photo (Base64 JPEG)
  │
  ▼
AnthropicMealAnalysisClient.swift (temperature: 0, schema-enforced prompt)
  │
  ├── [Success] ──► Parse JSON ──► SwiftData Meal Entity ──► Macro Charts
  │
  └── [Failure] ──► AnthropicMealAnalysisError (12 typed cases) ──► Specific UI Recovery`,
    architectureDetails: [
      'Deterministic Prompting: Set temperature: 0 with an in-code contract: "structured nutrition data must be reproducible and schema-compliant, not creative".',
      '12-Case Typed Error Enum: Differentiates payload size (too large), rate limits (429), API keys (401/403), refusals, and malformed responses so the UI can prompt the right user remedy.',
      'Secrets Hygiene: Protocol-based client architecture ensuring no API keys are ever committed to repository source.',
      'Accessibility: Includes dynamic type support, semantic labels, and high-contrast color token mapping.',
    ],
    receipt: {
      title: 'Typed Error Enumeration for Vision Analysis',
      file: 'AnthropicMealAnalysisClient.swift',
      code: `// Temperature 0 policy: structured nutrition data must be reproducible, not creative.
enum AnthropicMealAnalysisError: LocalizedError, Equatable {
    case payloadTooLarge(bytes: Int)
    case rateLimited(retryAfterSeconds: Int?)
    case unauthorized
    case forbidden
    case modelRefusal(reason: String)
    case invalidJSONSchema(details: String)
    case serverOverloaded
    case networkUnavailable
    case decodingFailure(underlying: String)
    case emptyResponse
    case unprocessableImage
    case unknown(statusCode: Int)

    var errorDescription: String? {
        switch self {
        case .rateLimited(let sec):
            return "Rate limit reached. Please retry in \\(sec ?? 15) seconds."
        case .modelRefusal(let reason):
            return "Model declined to analyze image: \\(reason)"
        case .payloadTooLarge:
            return "Photo exceeds maximum payload size. Compress before uploading."
        default:
            return "Meal analysis could not be completed."
        }
    }
}`,
      explanation:
        'Rather than throwing generic Error instances, Numo uses a 12-case typed error enum that maps exact HTTP and model refusal states into actionable user feedback.',
      note: 'Built during week three of the Apple Developer Academy.',
    },
    takeaways: [
      'Always set temperature to 0 when extracting structured data from vision models.',
      'Detailed typed error enums make AI-powered mobile apps resilient and trustworthy.',
      'Decouple raw AI payload schemas from SwiftData domain models immediately upon decoding.',
    ],
    links: [
      { label: 'Academy Journey Repo', url: 'https://github.com/mo7morad/My_Apple-Developer-Academy_Journey' },
    ],
    media: {
      type: 'phone-single',
      images: [
        { src: '/images/academy/numo-meal-entry.webp', alt: 'Numo nutrition entry screen' },
      ],
    },
  },
  {
    slug: 'homelab',
    title: 'Homelab &mdash; Self-Hosted Infrastructure',
    subtitle: 'A dedicated headless Debian server running on bare metal &mdash; owning my own infrastructure and DNS rather than renting cloud services.',
    category: 'Systems & DevOps',
    role: 'Sole Administrator &middot; Systems Architecture & Network Security',
    timeline: 'Sep 2026 &ndash; Present',
    status: 'Active 24/7 on Local Hardware',
    stack: ['Debian 12', 'NGINX', 'Pi-hole', 'Immich', 'SSH', 'Linux'],
    metrics: [
      { label: 'Active Services', value: '4', detail: 'Headless Debian over SSH' },
      { label: 'DNS Telemetry Sinkhole', value: '100%', detail: 'Network-wide ad/tracker blocking' },
      { label: 'Cloud Photo Rents', value: '$0', detail: 'Replaced with local NVMe drive' },
      { label: 'Reverse Proxy', value: 'NGINX', detail: 'Hand-configured TLS termination' },
    ],
    problem:
      'Modern digital life defaults to paying recurring cloud rents to Google and Apple for photo backup, while consumer devices leak telemetry and ad queries across every connection.',
    architectureDiagram: `[All Local Network Devices: Mac, iPhone, IoT]
  │
  ▼ (UDP/TCP Port 53)
[Pi-hole DNS Sinkhole] ── Drops ad/tracking domains at the network edge
  │
  ▼ (HTTPS Port 443)
[NGINX Reverse Proxy] ── Terminates TLS with hand-written configs & certificates
  │
  ▼ (Local Unix Socket / Port 3001)
[Immich Photo Server] ── Stores private photo library on physical NVMe storage`,
    architectureDetails: [
      'Bare-Metal Hardware: A repurposed dedicated machine running headless Debian 12, managed strictly over SSH with key-based authentication and root login disabled.',
      'Network-Wide DNS Filtering: Pi-hole blocks tracking domains, analytics beacons, and ads for every device on the local network before DNS resolution occurs.',
      'Self-Hosted Photo Preservation: Immich runs locally, replacing cloud subscriptions with private, high-speed photo backup to physical storage.',
      'Hand-Crafted NGINX Config: TLS termination, rate-limiting, and reverse proxy routing written directly in nginx.conf rather than relying on automated black-box control panels.',
    ],
    receipt: {
      title: 'NGINX Reverse Proxy Block with Hardened Headers',
      file: '/etc/nginx/sites-available/immich.conf',
      code: `server {
    listen 443 ssl http2;
    server_name photos.home.local;

    ssl_certificate /etc/ssl/certs/homelab.crt;
    ssl_certificate_key /etc/ssl/private/homelab.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Maximum upload for raw photos and 4K video clips
    client_max_body_size 50000M;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`,
      explanation:
        'The configuration terminates TLS locally and handles multi-gigabyte raw camera uploads over HTTP/2 WebSocket streaming directly to the internal Immich server.',
      note: 'Proof of genuine curiosity and the instinct to understand systems from the ground up.',
    },
    takeaways: [
      'Owning your own infrastructure builds deep understanding of networking and Linux administration.',
      'Pi-hole stops tracking at the network layer, where browser extensions cannot reach.',
      'Self-hosting proves that you understand software before you deploy it.',
    ],
    links: [],
    media: {
      type: 'rack',
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
