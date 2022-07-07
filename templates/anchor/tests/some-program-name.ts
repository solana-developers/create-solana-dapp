import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SomeProgramName } from "../target/types/some_program_name";

describe("some-program-name", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SomeProgramName as Program<SomeProgramName>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
