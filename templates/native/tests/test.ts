import {
    Connection,
    Keypair,
    sendAndConfirmTransaction,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';


function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(require('fs').readFileSync(path, "utf-8")))
    )
};


describe("hello-solana", () => {

    const connection = new Connection(`http://localhost:8899`, 'confirmed');
    const payer = createKeypairFromFile('{{ solana_wallet }}');
    const program = createKeypairFromFile('./program/target/solana/{{ dapp_name_snake }}-keypair.json');
  
    it("Say hello!", async () => {

        let ix = new TransactionInstruction({
            keys: [
                {pubkey: payer.publicKey, isSigner: true, isWritable: true}
            ],
            programId: program.publicKey,
            data: Buffer.alloc(0), // No data
        });

        await sendAndConfirmTransaction(
            connection, 
            new Transaction().add(ix),
            [payer]
        );
    });
  });
  