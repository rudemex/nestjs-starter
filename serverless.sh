export AWS_ACCESS_KEY_ID=AKIA2D4TPBKNKMNGLTX3
export AWS_SECRET_ACCESS_KEY=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

serverless deploy --stage dev

serverless config credentials --provider aws --key AKIA2D4TPBKNKMNGLTX3 --secret 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
