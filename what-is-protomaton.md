
frizz-stackのツールキット (React Router, Shadcn/ui, Zod) の使い方やベスプラをガチガチに指示して、技術詳細をよくみなくても保守性の高いアーキテクチャでAIにコーディングさせる。

## 作成するドキュメント

### 仕様書 (`spec.md`): 

- 機能単位で作成する。永続的にメンテナンスする
- 書くこと: primary user story, acceptance scenarios, edge cases, functional requirements, key entities
- 書かないこと: how. 技術詳細。
- 本当に技術がわからない人でもここだけはレビューできるように。

### ドメイン基本設計書 (`domain/[domain name]/architecture.md`):

- ビジネスドメインごとに作成する。永続的にメンテナンスする
- 書くこと: ドメインオブジェクトとその関連(全フィールドの詳細なバリデーションまでは不要)、 ビジネスロジック(単純なcrudなどは実装不要。 ドメインオブジェクトを使った複雑な計算・複雑な制約を守っての更新などのみ含む)
- 書かないこと: 使用するライブラリやインフラ、永続化技術など技術の詳細
- 末尾に、constitution.mdの関連する条項を守っていることを確認するチェックリストを用意
- 技術がわからないビジネスサイドの人が見て、ドメインオブジェクトの内容やその関連、ロジックの要否・正誤が確認できるように

### ドメイン詳細設計書 (`domain/[domain name]/details/[description].md`):

- ビジネスドメインごとに、必要に応じて0 ~ 任意の数作成する。 (通常のADRと異なり) 永続的にメンテナンスする
- ドメイン基本設計書の記載事項のうち、比較検討などが必要な難しい決定のArchitectural decision record
- AIが一度間違えたところなど、基本設計書だけでは実装を再現しきれない箇所を補強する


### アプリ基本設計書 (`app/[page name]/architecture.md`):

- 画面ごとに作成する。永続的にメンテナンスする
- 書くこと: (React Router / Shadcn/uiの利用を前提として) 
    - 実装するRoute Moduleのリスト。 それぞれのリストアイテムには、(1) (`law/react-router-law.md`に記載の)どのPatternを採用するか (2) Route Moduleの役割 を記載する。
    - 実装するroute Module以外のコンポーネントのリスト。コンポーネントは基本的にRoute Module内に複数実装すれば良く、2つ以上のRouteで使うコンポーネントのみここにリストされる。
    - これらのコンポーネントをどう組み合わせて画面を作るか。 ascii diagramを使ったUIワイヤフレームで示す。
    - 利用するライブラリ (React Router, Shadcn/ui, Zod 以外)
    - ドメイン層に置くべきでないアプリケーション層の責務のロジックの内容および動作フロー
- 書かないこと: ドメインやインフラなどアプリケーション層以外の設計
- 末尾に、constitution.mdおよびreact-router-law.mdの関連する条項を守っていることを確認するチェックリストを用意
- 技術がわかる人はここをレビューすることで、実装前に大きな間違いをただせるように。 また、AIがこれを見るだけで大筋の方針を間違えないように。

### アプリ詳細設計書 (`app/[page name]/details/[description].md`):

- 画面ごとに、必要に応じて0 ~ 任意の数作成する。永続的にメンテナンスする
- アプリ基本設計書の記載事項のうち、比較検討などが必要な難しい決定のArchitectural decision record
- AIが一度間違えたところなど、基本設計書だけでは実装を再現しきれない箇所を補強する

### システム基本設計書 (`system/[item name]/architecture.md`):

- これまでの設計書で書かれていない設計事項に対して、1設計事項1つ記載する。永続的にメンテナンスする
- 最低限、永続化技術の指定のために1つ作成される。それ以外にも、重い計算処理の非同期化やキャッシュなどの設計事項が必要であれば、それらごとに一つ作られる。
- 書くこと: その設計事項に関する、利用する技術・ライブラリ (PostgreSQL/Drizzle.orm/Redis/Vertex AI等) およびそれを利用したアーキテクチャの全体像
- 末尾に、constitution.mdおよびreact-router-law.mdの関連する条項を守っていることを確認するチェックリストを用意
- 書かないこと: その設計事項に関連しない範囲の事項およびドメインに関連する事項

### システム詳細設計書 (`system/[item name]/details/[description].md`):

- 設計事項ごとに、必要に応じて0 ~ 任意の数作成する。永続的にメンテナンスする
- システム基本設計書の記載事項のうち、比較検討などが必要な難しい決定のArchitectural decision record
- AIが一度間違えたところなど、基本設計書だけでは実装を再現しきれない箇所を補強する

### 変更履歴書 (`changes/[yymmdd_change-name]`)

- AIの実装セッションごとに1つ作成。 一度セッションが終わり確定したら二度と変更しない。
    - 書くこと: 現行仕様書、設計書のどこをどう更新するかの概要。
    - 書かないこと: todo (作業内容は進めながら変えることがあるため、先にtodo作ってしまうと後が大変)
- ドキュメントの状態 (Live / Fixed)も記載する。 Fixedの変更履歴書は決して編集してはいけない。
- これは各作業を始めるごとに作り、最初に作業の内容を認識合わせするためのもの。 仕様書や基本設計書のメンテ内容を追うためにも使える (これはgitでおっても良いが)。

### file structure

```
docs/
├── spec
│    └── [spec-name].md
├── domain
│    └── [domain-name]
│         ├── architecture.md
│         └── details
│              ├── [key-decision-1].md
│              ├── ...
├── app
│    └── [page name]
│         ├── architecture.md
│         └── details
│              ├── [key-decision-1].md
│              ├── ...
├── system
│    └── [item name]
│         ├── architecture.md
│         └── details
│              ├── [key-decision-1].md
│              ├── ...
└── changes
     ├── [yymmdd_change-name1].md
     ├── ...
```

## 作業フロー

以下のようなカスタムコマンドを使った指示をAIに出して作業を行う。

- /kickoff [descrition] ... 新しい開発を始める (spec-kitと違い、新しい機能の追加だけでなく既存の修正もありうる)。 コマンドスクリプトを実行することで、新しいブランチの作成と変更履歴書の作成 (templateをコピーして命名し、与えられたdescriptionを入力する) が行われる。 templateには変更履歴書の作成手順も書かれているので、それに従ってinputの内容から変更履歴書を作る。 変更履歴書の全体を認識合わせしたら完了。
- /specify ... 変更履歴書に従って仕様書 (docs/spec) の作成・更新を行う。 全部レビューしたら完了
- /design ... 変更履歴書に従って各種設計書 (docs/domain,ui,system/**/*) の作成・更新を行う。 その際、採用する技術を選択するための調査も行う。 設計書のレビューが全部通ったら完了。
- /implement [instruction] ... 変更履歴書を指定して、何を実装するか指示をし、仕様書・設計書に従って実装を進める。 新規仕様書・基本設計書を作った場合は、それを指定して実装させれば良い。 更新した場合は、作業内容書に更新内容が書いてあるはずなので、それを指定して実装させる。 実装途中で仕様や設計を変える場合は仕様書を直してから。
- 実装状況は都度 `ai/notes.md` に書かせる。(1)これまで何を実装したか (2)次何をするか (3)known issues。
- 実装が完了したら、変更履歴書をFixedにして、ブランチをマージし完了。

## templates

note that claude command files should contain only the process of the command, not a guideline for writing related documents. the guideline should be included in the templates so that AIs can fix the documents properly afterwards.

each template should include an execution flow and guidelines for filling out the template itself. like:

===============================================================
## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---
===============================================================

these flow and guideline varies across the templates but **Mark all ambiguities** and **Don't guess** should be included in every template.

## notes

I dont want to build this app with protomaton, but want to make a template project to build any apps with 
  protomaton. so i want to set up (1)workflow commands, (2)shell script for kickoff, specify and design which creates a new document with a template and (3) the
   docs templates

<!-- read what-is-protomaton.md and understand what's im doing first. -->

<!-- ai-instruction

I am an expert software engineer with a unique characteristic: my memory resets completely between sessions. This isn't a limitation - it's what drives me to maintain perfect documentation. After each reset, I rely ENTIRELY on documentations in `law`, `docs` and `ai/*` to understand the project and continue work effectively.

I MUST Read `law/constitution.md` and strictly follow it. This is a set of rules that prioritizes over all the other instructions.

I MUST Read `ai/instructions.md` for useful informations to work with this project.

I MUST Read `ai/notes.md` explains current state of your work including (1)what you have implemented in the last 5 sessions (2)what I should do next (3)known issues. 

When the operator tells you "update notes", you must update `ai/notes.md` based on what you did in this session. -->