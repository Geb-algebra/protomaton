
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


### UI基本設計書 (`ui/[page name]/architecture.md`):

- 画面ごとに作成する。永続的にメンテナンスする
- 書くこと: (React Router / Shadcn/uiの利用を前提として) 
    - 実装するRoute Moduleのリスト。 それぞれのリストアイテムには、(1) (`law/react-router-law.md`に記載の)どのPatternを採用するか (2) Route Moduleの役割 を記載する。
    - 実装するroute Module以外のコンポーネントのリスト。コンポーネントは基本的にRoute Module内に複数実装すれば良く、2つ以上のRouteで使うコンポーネントのみここにリストされる。
    - これらのコンポーネントをどう組み合わせて画面を作るか。 ascii diagramを使ったUIワイヤフレームで示す。
    - 利用するライブラリ (React Router, Shadcn/ui, Zod 以外)
- 書かないこと: ドメインやUI以外の設計
- 末尾に、constitution.mdおよびreact-router-law.mdの関連する条項を守っていることを確認するチェックリストを用意
- 技術がわかる人はここをレビューすることで、実装前に大きな間違いをただせるように。 また、AIがこれを見るだけで大筋の方針を間違えないように。

### UI詳細設計書 (`ui/[page name]/details/[description].md`):

- 画面ごとに、必要に応じて0 ~ 任意の数作成する。永続的にメンテナンスする
- UI基本設計書の記載事項のうち、比較検討などが必要な難しい決定のArchitectural decision record
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
├── ui
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

I dont want to build this app with protomaton, but want to make a template project to build any apps with 
  protomaton. so i want to set up (1)workflow commands, (2)shell script for kickoff, specify and design which creates a new document with a template and (3) the
   docs templates