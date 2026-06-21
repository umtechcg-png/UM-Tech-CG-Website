
-- activity_logs: allow admins to insert their own audit rows; no updates/deletes
DROP POLICY IF EXISTS "Admins insert own activity logs" ON public.activity_logs;
CREATE POLICY "Admins insert own activity logs"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND public.is_admin(auth.uid())
  );

-- login_history: allow users to insert their own login records; no updates/deletes
DROP POLICY IF EXISTS "Users insert own login history" ON public.login_history;
CREATE POLICY "Users insert own login history"
  ON public.login_history
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
