import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { {{ dapp_name_camel_upper }} } from "../target/types/{{ dapp_name_snake }}";

describe("{{ dapp_name }}", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.{{ dapp_name_camel_upper }} as Program<{{ dapp_name_camel_upper }}>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
