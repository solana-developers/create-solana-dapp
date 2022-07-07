# Notes on Templatizing:

## Anchor:
`programs` - Swap out `some-program-name` with their dApp name.   

`programs/<name>/Cargo.toml` - Swap out `[package]: some-program-name` & `[lib]: some_program_name` (*Notice underscores*).   

`programs/<name>/src/lib.rs` - Swap out `pub mod some_program_name`.   

`tests` - Swap the name of the test file `some-program-name.ts`.   

`tests/<name>.ts` - Swap the IDL import and the program config:
```typescript
import { SomeProgramName } from "../target/types/some_program_name";

const program = anchor.workspace.SomeProgramName as Program<SomeProgramName>;
```
`Anchor.toml` - Swap the program ID declaration:
```toml
some_program_name = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"
```

#### :star: Local wallet configs:
`Anchor.toml`:
```toml
wallet = "~/.config/solana/id.json"
```

## Native:
`program/Cargo.toml` - Swap out `[package]: some-program-name`.   

`tests/test.ts` - Swap the program keypair name:
```typescript
const program = createKeypairFromFile('./program/solana/some_program_name-keypair.json');
```

#### :star: Local wallet configs:
`tests/test.ts`:
```typescript
const payer = createKeypairFromFile(require('os').homedir() + '/.config/solana/id.json');
```

### :wrench: Native's `tsconfig.json` comes up red in VS Code??