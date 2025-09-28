

@app.get("/auth/user")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = supabase.auth.get_user(token)
    return user